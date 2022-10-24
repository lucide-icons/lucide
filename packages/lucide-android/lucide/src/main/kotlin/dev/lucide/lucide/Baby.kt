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

public val Lucide.Baby: ImageVector
    get() {
        if (_baby != null) {
            return _baby!!
        }
        _baby = Builder(name = "Baby", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(9.0f, 12.0f)
                horizontalLineToRelative(0.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.0f, 12.0f)
                horizontalLineToRelative(0.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(10.0f, 16.0f)
                curveToRelative(0.5f, 0.3f, 1.2f, 0.5f, 2.0f, 0.5f)
                reflectiveCurveToRelative(1.5f, -0.2f, 2.0f, -0.5f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(19.0f, 6.3f)
                arcToRelative(9.0f, 9.0f, 0.0f, false, true, 1.8f, 3.9f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 0.0f, 3.6f)
                arcToRelative(9.0f, 9.0f, 0.0f, false, true, -17.6f, 0.0f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, 0.0f, -3.6f)
                arcTo(9.0f, 9.0f, 0.0f, false, true, 12.0f, 3.0f)
                curveToRelative(2.0f, 0.0f, 3.5f, 1.1f, 3.5f, 2.5f)
                reflectiveCurveToRelative(-0.9f, 2.5f, -2.0f, 2.5f)
                curveToRelative(-0.8f, 0.0f, -1.5f, -0.4f, -1.5f, -1.0f)
            }
        }
        .build()
        return _baby!!
    }

private var _baby: ImageVector? = null
