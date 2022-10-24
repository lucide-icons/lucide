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

public val Lucide.Rocket: ImageVector
    get() {
        if (_rocket != null) {
            return _rocket!!
        }
        _rocket = Builder(name = "Rocket", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(4.5f, 16.5f)
                curveToRelative(-1.5f, 1.26f, -2.0f, 5.0f, -2.0f, 5.0f)
                reflectiveCurveToRelative(3.74f, -0.5f, 5.0f, -2.0f)
                curveToRelative(0.71f, -0.84f, 0.7f, -2.13f, -0.09f, -2.91f)
                arcToRelative(2.18f, 2.18f, 0.0f, false, false, -2.91f, -0.09f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(12.0f, 15.0f)
                lineToRelative(-3.0f, -3.0f)
                arcToRelative(22.0f, 22.0f, 0.0f, false, true, 2.0f, -3.95f)
                arcTo(12.88f, 12.88f, 0.0f, false, true, 22.0f, 2.0f)
                curveToRelative(0.0f, 2.72f, -0.78f, 7.5f, -6.0f, 11.0f)
                arcToRelative(22.35f, 22.35f, 0.0f, false, true, -4.0f, 2.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(9.0f, 12.0f)
                horizontalLineTo(4.0f)
                reflectiveCurveToRelative(0.55f, -3.03f, 2.0f, -4.0f)
                curveToRelative(1.62f, -1.08f, 5.0f, 0.0f, 5.0f, 0.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 15.0f)
                verticalLineToRelative(5.0f)
                reflectiveCurveToRelative(3.03f, -0.55f, 4.0f, -2.0f)
                curveToRelative(1.08f, -1.62f, 0.0f, -5.0f, 0.0f, -5.0f)
            }
        }
        .build()
        return _rocket!!
    }

private var _rocket: ImageVector? = null
