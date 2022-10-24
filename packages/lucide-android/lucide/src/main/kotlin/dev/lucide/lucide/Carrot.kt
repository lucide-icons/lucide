package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Carrot: ImageVector
    get() {
        if (_carrot != null) {
            return _carrot!!
        }
        _carrot = Builder(name = "Carrot", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(2.27f, 21.7f)
                reflectiveCurveToRelative(9.87f, -3.5f, 12.73f, -6.36f)
                arcToRelative(4.5f, 4.5f, 0.0f, false, false, -6.36f, -6.37f)
                curveTo(5.77f, 11.84f, 2.27f, 21.7f, 2.27f, 21.7f)
                close()
                moveTo(8.64f, 14.0f)
                lineToRelative(-2.05f, -2.04f)
                moveTo(15.34f, 15.0f)
                lineToRelative(-2.46f, -2.46f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(22.0f, 9.0f)
                reflectiveCurveToRelative(-1.33f, -2.0f, -3.5f, -2.0f)
                curveTo(16.86f, 7.0f, 15.0f, 9.0f, 15.0f, 9.0f)
                reflectiveCurveToRelative(1.33f, 2.0f, 3.5f, 2.0f)
                reflectiveCurveTo(22.0f, 9.0f, 22.0f, 9.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.0f, 2.0f)
                reflectiveCurveToRelative(-2.0f, 1.33f, -2.0f, 3.5f)
                reflectiveCurveTo(15.0f, 9.0f, 15.0f, 9.0f)
                reflectiveCurveToRelative(2.0f, -1.84f, 2.0f, -3.5f)
                curveTo(17.0f, 3.33f, 15.0f, 2.0f, 15.0f, 2.0f)
                close()
            }
        }
        .build()
        return _carrot!!
    }

private var _carrot: ImageVector? = null
